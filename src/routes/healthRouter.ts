import { Router } from "express";
import { coreClient } from "../utils/apiClientUtil";

export const healthRouter = Router();

healthRouter.get("", async (req, res) => {
    try {
        const { response: podResponse, body: podBody } =
            await coreClient.listNamespacedPod("node");
        const { items } = podBody;
        const podName = items
            .filter((item) => item.metadata?.labels!.app === "node")
            .map((item) => item.metadata?.name)
            .reduce((previousValue, currentValue) => {
                if (!previousValue) return;
                return previousValue + currentValue;
            });
        if (!podName) return;
        const { response, body } = await coreClient.readNamespacedPodLog(
            podName,
            "node",
            "besu"
        );
        if (body.includes("io.vertx.core.VertxException: Thread blocked")) {
            res.status(403).send("FAILURE");
            return;
        }
        res.status(200).send("SUCESS");
    } catch (err: any) {
        res.status(err?.statusCode || 403).json(err?.body ?? err);
    }
});
