import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { ConfigService } from './app/config.service';
import { HttpClient } from '@angular/common/http';

bootstrapApplication(App, appConfig)
  .then(async (ref) => {
    const injector = ref.injector;
    const http = injector.get(HttpClient);
    const configService = injector.get(ConfigService);
    await configService.load();
  })
  .catch((err) => console.error(err));
