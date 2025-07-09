export const usePricesApi = () => {
  const config = useRuntimeConfig();

  const streamPrices = async (
    from: Date,
    to: Date,
    onData: (item: {
      id: number;
      timestamp: string;
      price_usd: number;
    }) => void,
    signal: AbortSignal
  ): Promise<void> => {
    const url = new URL(`${config.public.apiBase}/price`);
    url.searchParams.set("from", from.toISOString());
    url.searchParams.set("to", to.toISOString());

    const response = await fetch(url.toString(), { signal });
    if (!response.body) throw new Error("No response body");

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const item = JSON.parse(line);
          onData({
            id: item.price_id,
            price_usd: item.price_price_usd,
            timestamp: item.price_timestamp,
          });
        } catch (e) {
          console.warn("NDJSON parse error:", line, e);
        }
      }
    }
  };

  return { streamPrices };
};
