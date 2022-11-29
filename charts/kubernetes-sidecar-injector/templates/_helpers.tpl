{{/*
Expand the name of the chart.
*/}}
{{- define "kubernetes-sidecar-injector.name" -}}
{{- default .Chart.Name | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "kubernetes-sidecar-injector.fullname" -}}
{{- $name := default .Chart.Name }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "kubernetes-sidecar-injector.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "kubernetes-sidecar-injector.labels" -}}
helm.sh/chart: {{ include "kubernetes-sidecar-injector.chart" . }}
{{ include "kubernetes-sidecar-injector.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "kubernetes-sidecar-injector.selectorLabels" -}}
app.kubernetes.io/name: {{ include "kubernetes-sidecar-injector.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name for secret to use.
*/}}
{{- define "kubernetes-sidecar-injector.secretName" -}}
{{- if .Values.admission.secret.create }}
  {{- default (include "kubernetes-sidecar-injector.fullname" .) .Values.admission.secret.name | trunc 63 | trimSuffix "-" }}
{{- else }}
  {{- default "default" .Values.admission.secret.name }}
{{- end }}
{{- end }}

{{/*
Create the name of the service to use
*/}}
{{- define "kubernetes-sidecar-injector.serviceName" -}}
{{- default (include "kubernetes-sidecar-injector.fullname" .) .Values.service.name | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create the name of the admission controller to use
*/}}
{{- define "kubernetes-sidecar-injector.admissionName" -}}
{{- default (include "kubernetes-sidecar-injector.fullname" .) .Values.admission.name | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create service fully qualified hostname
*/}}
{{- define "kubernetes-sidecar-injector.service.fullname" -}}
{{- default ( printf "%s.%s.svc" (include "kubernetes-sidecar-injector.serviceName" .) .Release.Namespace ) }}
{{- end }}

{{/*
Generate certificate authority
*/}}
{{- define "kubernetes-sidecar-injector.gen-certs" -}}
{{- $expiration := (.Values.admission.ca.expiration | int) -}}
{{- if (or (empty .Values.admission.ca.cert) (empty .Values.admission.ca.key)) -}}
{{- $ca :=  genCA "kubernetes-sidecar-injector-ca" $expiration -}}
{{- template "kubernetes-sidecar-injector.gen-client-tls" (dict "RootScope" . "CA" $ca) -}}
{{- end -}}
{{- end -}}

{{/*
Generate client key and cert from CA
*/}}
{{- define "kubernetes-sidecar-injector.gen-client-tls" -}}
{{- $altNames := list ( include "kubernetes-sidecar-injector.service.fullname" .RootScope) -}}
{{- $expiration := (.RootScope.Values.admission.ca.expiration | int) -}}
{{- $cert := genSignedCert ( include "kubernetes-sidecar-injector.fullname" .RootScope) nil $altNames $expiration .CA -}}
{{- $clientCert := $cert.Cert | b64enc -}}
{{- $clientKey := $cert.Key | b64enc -}}
caCert: {{ .CA.Cert | b64enc }}
clientCert: {{ $clientCert }}
clientKey: {{ $clientKey }}
{{- end -}}