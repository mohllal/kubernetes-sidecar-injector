/**
* Liveness probe.
* 
* @returns 
*/
function liveness() {
  return { status: 'ok', time: Date.now() };
}


/**
* Readiness probe.
* 
* @returns 
*/
function readiness() {
  return { status: 'ok', time: Date.now() };
}


export default {
  liveness,
  readiness
} as const;