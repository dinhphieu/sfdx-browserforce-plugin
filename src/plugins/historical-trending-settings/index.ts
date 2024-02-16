import { BrowserforcePlugin } from '../../plugin';
import { HistoricalTrendingPage } from './page';

export type Config = {
  enabled: boolean;
};

export class HistoricalTrendingSettings extends BrowserforcePlugin {
  public async retrieve(definition?: Config): Promise<Config> {
    const result = { enabled: false };
    const page = new HistoricalTrendingPage(await this.browserforce.openPage(HistoricalTrendingPage.getUrl()));
    result.enabled = await page.getStatus();
    return result;
  }

  public async apply(config: Config): Promise<void> {
    const page = new HistoricalTrendingPage(await this.browserforce.openPage(HistoricalTrendingPage.getUrl()));
    await page.setStatus(config.enabled);
  }
}
