import Cache from "node-cache";

export const apiCache = new Cache({ stdTTL: 60 * 5 });
