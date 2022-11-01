const app = require('express')();
const k8s = require('@kubernetes/client-node');
const kc = new k8s.KubeConfig();

kc.loadFromString(process.env.KUBE_CONFIG);

const k8sApi = kc.makeApiClient(k8s.AppsV1Api);

async function scale(namespace, name) {
	// find the particular deployment
	const res = await k8sApi.readNamespacedDeployment(name, namespace);
	let deployment = res.body;

	// edit
	deployment.spec.replicas = 0;

	await k8sApi.replaceNamespacedDeployment(name, namespace, deployment);
}

(async () => {
	const {
		body: { items },
	} = await k8sApi.listDeploymentForAllNamespaces();

	items.map(({ metadata: { name, namespace } }) => {
		if (
			![
				'kube-public',
				'kube-system',
				'kube-node-lease',
				'cert-manager',
				'ingress-nginx',
			].includes(namespace)
		) {
			scale(namespace, name);
		}
	});
})();

app.listen(parseInt(process.env.PORT));
