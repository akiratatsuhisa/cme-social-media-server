import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { MaterialYouService } from 'factory';
import { MATERIAL_SERVICE_NAME, MaterialClient } from 'src/proto/material';

@Injectable()
export class AppService {
  private readonly materialClient: MaterialClient;
  constructor(
    @Inject(MaterialYouService.name) private readonly client: ClientGrpc,
  ) {
    this.materialClient = this.client.getService<MaterialClient>(
      MATERIAL_SERVICE_NAME,
    );
  }

  async ping() {
    return this.materialClient.test({});
  }
}
