import { Router } from "express";
import { coreClient } from "../utils/apiClientUtil";

export const healthRouter = Router();

healthRouter.get("", async (req, res) => {
    try {
        const { response: podResponse, body: podBody } =
            await coreClient.listNamespacedPod("kube-api");
        const { items } = podBody;
        const podName = items
            .filter((item) => item.metadata?.name?.includes("kube-api"))
            .map((item) => item.metadata?.name)
            .reduce((previousValue, currentValue, currentIndex, array) => {
                if (!previousValue) return;
                return previousValue + currentValue;
            });
        if (!podName) return;
        const { response, body } = await coreClient.readNamespacedPodLog(
            podName,
            "kube-api"
        );
        res.status(response.statusCode as number).json(body);
    } catch (err: any) {
        res.status(err?.statusCode || 403).json(err?.body ?? err);
    }
});
