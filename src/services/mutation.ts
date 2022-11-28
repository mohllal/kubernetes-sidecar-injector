import * as jsonpatch from 'fast-json-patch';
import { V1Pod, V1Container } from "@kubernetes/client-node";

import { V1AdmissionRequest, V1AdmissionResponse } from "@type/kubernetes";

/**
* Handle mutation webhook by injecting a busybox-curl container into the pod
* 
* @params admissionReviewRequest V1AdmissionRequest<V1Pod>
* @returns V1AdmissionResponse
*/
export const handle = (admissionReviewRequest: V1AdmissionRequest<V1Pod>): V1AdmissionResponse => {
  try {
    const admissionReviewResponse: V1AdmissionResponse = {
      allowed: true,
      uid: admissionReviewRequest.uid,
    };
    
    // skip dryRun requests
    if (admissionReviewRequest.dryRun) return admissionReviewResponse;
  
    const originalPod = admissionReviewRequest.object as V1Pod;
    const mutatedPod = JSON.parse(JSON.stringify(originalPod)) as V1Pod;

    const originalPodContainers = originalPod.spec?.containers || [];
    const mutatedPodContainers = injectContainer(originalPodContainers);
    
    // update the mutated pod spec with the new containers array
    mutatedPod.spec = { ...mutatedPod.spec, containers: mutatedPodContainers };

    // generate json patch string
    const patch = jsonpatch.compare(originalPod, mutatedPod);
    const patchString = JSON.stringify(patch);
    const patchBase64 = Buffer.from(patchString).toString('base64');

    if (patch.length > 0) {
      admissionReviewResponse.patchType = "JSONPatch";
      admissionReviewResponse.patch = patchBase64;
    }
  
    return admissionReviewResponse;
  } catch (error) {
    const admissionReviewResponse: V1AdmissionResponse = {
        uid: admissionReviewRequest.uid,
        allowed: false,
        status: { code: 500, message: error.message }
    };

    return admissionReviewResponse;
  }
};

const injectContainer = (containers: V1Container[]): V1Container[] => {
  const sideCarContainer: V1Container = {
    name: 'curl',
    image: 'yauritux/busybox-curl:latest',
    imagePullPolicy: 'IfNotPresent',
    command: ["/bin/sh", "-ec", "while :; do echo '.'; sleep 5 ; done"]
  };

  return [...containers, sideCarContainer];
};

export default {
  handle,
} as const;