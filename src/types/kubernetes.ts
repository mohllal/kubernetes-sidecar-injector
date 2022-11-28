/** @description Options unambiguously identifies a admission options. */
export type V1Options = {
  apiVersion: string;
  kind: string;
};

/** @description GroupVersionKind unambiguously identifies a kind.  It doesn't anonymously include GroupVersion to avoid automatic coersion.  It doesn't use a GroupVersion to avoid custom marshalling */
export type V1GroupVersionKind = {
  group: string;
  kind: string;
  version: string;
};

/** @description GroupVersionResource unambiguously identifies a resource.  It doesn't anonymously include GroupVersion to avoid automatic coersion.  It doesn't use a GroupVersion to avoid custom marshalling */
export type V1GroupVersionResource = {
  group: string;
  resource: string;
  version: string;
};

/** @description ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}. */
export type V1ListMeta = {
  /** @description continue may be set if the user set a limit on the number of items returned, and indicates that the server has more data available. The value is opaque and may be used to issue another request to the endpoint that served this list to retrieve the next set of available objects. Continuing a consistent list may not be possible if the server configuration has changed or more than a few minutes have passed. The resourceVersion field returned when using this continue value will be identical to the value in the first response, unless you have received this token from an error message. */
  continue?: string;
  /**
   * Format: int64
   * @description remainingItemCount is the number of subsequent items in the list which are not included in this list response. If the list request contained label or field selectors, then the number of remaining items is unknown and the field will be left unset and omitted during serialization. If the list is complete (either because it is not chunking or because this is the last chunk), then there are no more remaining items and this field will be left unset and omitted during serialization. Servers older than v1.15 do not set this field. The intended use of the remainingItemCount is *estimating* the size of a collection. Clients should not rely on the remainingItemCount to be set or to be exact.
   */
  remainingItemCount?: number;
  /** @description String that identifies the server's internal version of this object that can be used by clients to determine when objects have changed. Value must be treated as opaque by clients and passed unmodified back to the server. Populated by the system. Read-only. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency */
  resourceVersion?: string;
  /**
   * @description selfLink is a URL representing this object. Populated by the system. Read-only.
   *
   * DEPRECATED Kubernetes will stop propagating this field in 1.20 release and the field is planned to be removed in 1.21 release.
   */
  selfLink?: string;
};

/** @description Status is a return value for calls that don't return other objects. */
export type V1Status = {
  /** @description APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources */
  apiVersion?: string;
  /**
   * Format: int32
   * @description Suggested HTTP return code for this status, 0 if not set.
   */
  code?: number;
  /** @description Extended data associated with the reason.  Each reason may define its own extended details. This field is optional and the data returned is not guaranteed to conform to any schema except that defined by the reason type. */
  details?: V1StatusDetails;
  /** @description Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds */
  kind?: string;
  /** @description A human-readable description of the status of this operation. */
  message?: string;
  /** @description Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds */
  metadata?: V1ListMeta;
  /** @description A machine-readable description of why this operation is in the "Failure" status. If this value is empty there is no information available. A Reason clarifies an HTTP status code but does not override it. */
  reason?: string;
  /** @description Status of the operation. One of: "Success" or "Failure". More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status */
  status?: string;
};

/** @description StatusCause provides more information about an api.Status failure, including cases when multiple errors are encountered. */
export type V1StatusCause = {
  /**
   * @description The field of the resource that has caused this error, as named by its JSON serialization. May include dot and postfix notation for nested attributes. Arrays are zero-indexed.  Fields may appear more than once in an array of causes due to fields having multiple errors. Optional.
   *
   * Examples:
   *   "name" - the field "name" on the current resource
   *   "items[0].name" - the field "name" on the first array entry in "items"
   */
  field?: string;
  /** @description A human-readable description of the cause of the error.  This field may be presented as-is to a reader. */
  message?: string;
  /** @description A machine-readable description of the cause of the error. If this value is empty there is no information available. */
  reason?: string;
};

/** @description StatusDetails is a set of additional properties that MAY be set by the server to provide additional information about a response. The Reason field of a Status object defines what attributes will be set. Clients must ignore fields that do not match the defined type of each attribute, and should assume that any attribute may be empty, invalid, or under defined. */
export type V1StatusDetails = {
  /** @description The Causes array includes more details associated with the StatusReason failure. Not all StatusReasons may provide detailed causes. */
  causes?: V1StatusCause[];
  /** @description The group attribute of the resource associated with the status StatusReason. */
  group?: string;
  /** @description The kind attribute of the resource associated with the status StatusReason. On some operations may differ from the requested resource Kind. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds */
  kind?: string;
  /** @description The name attribute of the resource associated with the status StatusReason (when there is a single name which can be described). */
  name?: string;
  /**
   * Format: int32
   * @description If specified, the time in seconds before the operation should be retried. Some errors may indicate the client must take an alternate action - for those errors this field may indicate how long to wait before taking the alternate action.
   */
  retryAfterSeconds?: number;
  /** @description UID of the resource. (when there is a single resource which can be described). More info: http://kubernetes.io/docs/user-guide/identifiers#uids */
  uid?: string;
};

/** @description UserInfo holds the information about the user needed to implement the user.Info interface. */
export type V1UserInfo = {
  /** @description Any additional information provided by the authenticator. */
  extra?: { [key: string]: string[] };
  /** @description The names of groups this user is a part of. */
  groups?: string[];
  /** @description A unique value that identifies this user across time. If this user is deleted and another user by the same name is added, they will have different UIDs. */
  uid?: string;
  /** @description The name that uniquely identifies this user among all active users. */
  username?: string;
};

/** @description AdmissionRequest describes the admission.Attributes for the admission request. */
export type V1AdmissionRequest<T> = {
  /** @description DryRun indicates that modifications will definitely not be persisted for this request. Defaults to false. */
  dryRun?: boolean;
  /** @description Kind is the fully-qualified type of object being submitted (for example, v1.Pod or autoscaling.v1.Scale) */
  kind: V1GroupVersionKind;
  /** @description Name is the name of the object as presented in the request.  On a CREATE operation, the client may omit name and rely on the server to generate the name.  If that is the case, this field will contain an empty string. */
  name?: string;
  /** @description Namespace is the namespace associated with the request (if any). */
  namespace?: string;
  /** @description Object is the object from the incoming request. */
  object?: T;
  /** @description OldObject is the existing object. Only populated for DELETE and UPDATE requests. */
  oldObject?: T;
  /** @description Operation is the operation being performed. This may be different than the operation requested. e.g. a patch can result in either a CREATE or UPDATE Operation. */
  operation: string;
  /** @description Options is the operation option structure of the operation being performed. e.g. `meta.k8s.io/v1.DeleteOptions` or `meta.k8s.io/v1.CreateOptions`. This may be different than the options the caller provided. e.g. for a patch request the performed Operation might be a CREATE, in which case the Options will a `meta.k8s.io/v1.CreateOptions` even though the caller provided `meta.k8s.io/v1.PatchOptions`. */
  options?: V1Options;
  /**
   * @description RequestKind is the fully-qualified type of the original API request (for example, v1.Pod or autoscaling.v1.Scale). If this is specified and differs from the value in "kind", an equivalent match and conversion was performed.
   *
   * For example, if deployments can be modified via apps/v1 and apps/v1beta1, and a webhook registered a rule of `apiGroups:["apps"], apiVersions:["v1"], resources: ["deployments"]` and `matchPolicy: Equivalent`, an API request to apps/v1beta1 deployments would be converted and sent to the webhook with `kind: {group:"apps", version:"v1", kind:"Deployment"}` (matching the rule the webhook registered for), and `requestKind: {group:"apps", version:"v1beta1", kind:"Deployment"}` (indicating the kind of the original API request).
   *
   * See documentation for the "matchPolicy" field in the webhook configuration type for more details.
   */
  requestKind?: V1GroupVersionKind;
  /**
   * @description RequestResource is the fully-qualified resource of the original API request (for example, v1.pods). If this is specified and differs from the value in "resource", an equivalent match and conversion was performed.
   *
   * For example, if deployments can be modified via apps/v1 and apps/v1beta1, and a webhook registered a rule of `apiGroups:["apps"], apiVersions:["v1"], resources: ["deployments"]` and `matchPolicy: Equivalent`, an API request to apps/v1beta1 deployments would be converted and sent to the webhook with `resource: {group:"apps", version:"v1", resource:"deployments"}` (matching the resource the webhook registered for), and `requestResource: {group:"apps", version:"v1beta1", resource:"deployments"}` (indicating the resource of the original API request).
   *
   * See documentation for the "matchPolicy" field in the webhook configuration type.
   */
  requestResource?: V1GroupVersionResource;
  /** @description RequestSubResource is the name of the subresource of the original API request, if any (for example, "status" or "scale") If this is specified and differs from the value in "subResource", an equivalent match and conversion was performed. See documentation for the "matchPolicy" field in the webhook configuration type. */
  requestSubResource?: string;
  /** @description Resource is the fully-qualified resource being requested (for example, v1.pods) */
  resource: V1GroupVersionResource;
  /** @description SubResource is the subresource being requested, if any (for example, "status" or "scale") */
  subResource?: string;
  /** @description UID is an identifier for the individual request/response. It allows us to distinguish instances of requests which are otherwise identical (parallel requests, requests when earlier requests did not modify etc) The UID is meant to track the round trip (request/response) between the KAS and the WebHook, not the user request. It is suitable for correlating log entries between the webhook and apiserver, for either auditing or debugging. */
  uid: string;
  /** @description UserInfo is information about the requesting user */
  userInfo: V1UserInfo;
};

/** @description AdmissionResponse describes an admission response. */
export type V1AdmissionResponse = {
  /** @description Allowed indicates whether or not the admission request was permitted. */
  allowed: boolean;
  /** @description AuditAnnotations is an unstructured key value map set by remote admission controller (e.g. error=image-blacklisted). MutatingAdmissionWebhook and ValidatingAdmissionWebhook admission controller will prefix the keys with admission webhook name (e.g. imagepolicy.example.com/error=image-blacklisted). AuditAnnotations will be provided by the admission webhook to add additional context to the audit log for this request. */
  auditAnnotations?: { [key: string]: string };
  /**
   * Format: byte
   * @description The patch body. Currently we only support "JSONPatch" which implements RFC 6902.
   */
  patch?: string;
  /** @description The type of Patch. Currently we only allow "JSONPatch". */
  patchType?: string;
  /** @description Result contains extra details into why an admission request was denied. This field IS NOT consulted in any way if "Allowed" is "true". */
  status?: V1Status;
  /** @description UID is an identifier for the individual request/response. This must be copied over from the corresponding AdmissionRequest. */
  uid: string;
  /** @description warnings is a list of warning messages to return to the requesting API client. Warning messages describe a problem the client making the API request should correct or be aware of. Limit warnings to 120 characters if possible. Warnings over 256 characters and large numbers of warnings may be truncated. */
  warnings?: string[];
};

/** @description AdmissionReview describes an admission review request/response. */
export type V1AdmissionReview<T> = {
  /** @description APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources */
  apiVersion?: string;
  /** @description Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds */
  kind?: string;
  /** @description Request describes the attributes for the admission request. */
  request?: V1AdmissionRequest<T>;
  /** @description Response describes the attributes for the admission response. */
  response?: V1AdmissionResponse;
};

/** @description AdmissionRequest describes the admission.Attributes for the admission request. */
export type V1beta1AdmissionRequest<T> = {
  /** @description DryRun indicates that modifications will definitely not be persisted for this request. Defaults to false. */
  dryRun?: boolean;
  /** @description Kind is the fully-qualified type of object being submitted (for example, v1.Pod or autoscaling.v1.Scale) */
  kind: V1GroupVersionKind;
  /** @description Name is the name of the object as presented in the request.  On a CREATE operation, the client may omit name and rely on the server to generate the name.  If that is the case, this field will contain an empty string. */
  name?: string;
  /** @description Namespace is the namespace associated with the request (if any). */
  namespace?: string;
  /** @description Object is the object from the incoming request. */
  object?: T;
  /** @description OldObject is the existing object. Only populated for DELETE and UPDATE requests. */
  oldObject?: T;
  /** @description Operation is the operation being performed. This may be different than the operation requested. e.g. a patch can result in either a CREATE or UPDATE Operation. */
  operation: string;
  /** @description Options is the operation option structure of the operation being performed. e.g. `meta.k8s.io/v1.DeleteOptions` or `meta.k8s.io/v1.CreateOptions`. This may be different than the options the caller provided. e.g. for a patch request the performed Operation might be a CREATE, in which case the Options will a `meta.k8s.io/v1.CreateOptions` even though the caller provided `meta.k8s.io/v1.PatchOptions`. */
  options?: V1Options;
  /**
   * @description RequestKind is the fully-qualified type of the original API request (for example, v1.Pod or autoscaling.v1.Scale). If this is specified and differs from the value in "kind", an equivalent match and conversion was performed.
   *
   * For example, if deployments can be modified via apps/v1 and apps/v1beta1, and a webhook registered a rule of `apiGroups:["apps"], apiVersions:["v1"], resources: ["deployments"]` and `matchPolicy: Equivalent`, an API request to apps/v1beta1 deployments would be converted and sent to the webhook with `kind: {group:"apps", version:"v1", kind:"Deployment"}` (matching the rule the webhook registered for), and `requestKind: {group:"apps", version:"v1beta1", kind:"Deployment"}` (indicating the kind of the original API request).
   *
   * See documentation for the "matchPolicy" field in the webhook configuration type for more details.
   */
  requestKind?: V1GroupVersionKind;
  /**
   * @description RequestResource is the fully-qualified resource of the original API request (for example, v1.pods). If this is specified and differs from the value in "resource", an equivalent match and conversion was performed.
   *
   * For example, if deployments can be modified via apps/v1 and apps/v1beta1, and a webhook registered a rule of `apiGroups:["apps"], apiVersions:["v1"], resources: ["deployments"]` and `matchPolicy: Equivalent`, an API request to apps/v1beta1 deployments would be converted and sent to the webhook with `resource: {group:"apps", version:"v1", resource:"deployments"}` (matching the resource the webhook registered for), and `requestResource: {group:"apps", version:"v1beta1", resource:"deployments"}` (indicating the resource of the original API request).
   *
   * See documentation for the "matchPolicy" field in the webhook configuration type.
   */
  requestResource?: V1GroupVersionResource;
  /** @description RequestSubResource is the name of the subresource of the original API request, if any (for example, "status" or "scale") If this is specified and differs from the value in "subResource", an equivalent match and conversion was performed. See documentation for the "matchPolicy" field in the webhook configuration type. */
  requestSubResource?: string;
  /** @description Resource is the fully-qualified resource being requested (for example, v1.pods) */
  resource: V1GroupVersionResource;
  /** @description SubResource is the subresource being requested, if any (for example, "status" or "scale") */
  subResource?: string;
  /** @description UID is an identifier for the individual request/response. It allows us to distinguish instances of requests which are otherwise identical (parallel requests, requests when earlier requests did not modify etc) The UID is meant to track the round trip (request/response) between the KAS and the WebHook, not the user request. It is suitable for correlating log entries between the webhook and apiserver, for either auditing or debugging. */
  uid: string;
  /** @description UserInfo is information about the requesting user */
  userInfo: V1UserInfo;
};

/** @description AdmissionResponse describes an admission response. */
export type V1beta1AdmissionResponse = {
  /** @description Allowed indicates whether or not the admission request was permitted. */
  allowed: boolean;
  /** @description AuditAnnotations is an unstructured key value map set by remote admission controller (e.g. error=image-blacklisted). MutatingAdmissionWebhook and ValidatingAdmissionWebhook admission controller will prefix the keys with admission webhook name (e.g. imagepolicy.example.com/error=image-blacklisted). AuditAnnotations will be provided by the admission webhook to add additional context to the audit log for this request. */
  auditAnnotations?: { [key: string]: string };
  /**
   * Format: byte
   * @description The patch body. Currently we only support "JSONPatch" which implements RFC 6902.
   */
  patch?: string;
  /** @description The type of Patch. Currently we only allow "JSONPatch". */
  patchType?: string;
  /** @description Result contains extra details into why an admission request was denied. This field IS NOT consulted in any way if "Allowed" is "true". */
  status?: V1Status;
  /** @description UID is an identifier for the individual request/response. This should be copied over from the corresponding AdmissionRequest. */
  uid: string;
  /** @description warnings is a list of warning messages to return to the requesting API client. Warning messages describe a problem the client making the API request should correct or be aware of. Limit warnings to 120 characters if possible. Warnings over 256 characters and large numbers of warnings may be truncated. */
  warnings?: string[];
};

/** @description AdmissionReview describes an admission review request/response. */
export type V1beta1AdmissionReview<T> = {
  /** @description APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources */
  apiVersion?: string;
  /** @description Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds */
  kind?: string;
  /** @description Request describes the attributes for the admission request. */
  request?: V1beta1AdmissionRequest<T>;
  /** @description Response describes the attributes for the admission response. */
  response?: V1beta1AdmissionResponse;
};
