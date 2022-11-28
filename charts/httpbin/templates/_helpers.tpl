{{/*
Expand the name of the chart.
*/}}
{{- define "httpbin.name" -}}
{{- default .Chart.Name | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "httpbin.fullname" -}}
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
{{- define "httpbin.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "httpbin.serviceName" -}}
{{- default (include "httpbin.fullname" .) .Values.service.name | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "httpbin.labels" -}}
helm.sh/chart: {{ include "httpbin.chart" . }}
{{ include "httpbin.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
sidecar.me/inject: "True"
{{- end }}

{{/*
Selector labels
*/}}
{{- define "httpbin.selectorLabels" -}}
app.kubernetes.io/name: {{ include "httpbin.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
sidecar.me/inject: "True"
{{- end }}
