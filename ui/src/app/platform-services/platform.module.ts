/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { NgModule } from '@angular/core';
import { PipelineElementService } from '../../../projects/streampipes/platform-services/src/lib/apis/pipeline-element.service';
import { PipelineService } from '../../../projects/streampipes/platform-services/src/lib/apis/pipeline.service';
import { PlatformServicesCommons } from '../../../projects/streampipes/platform-services/src/lib/apis/commons.service';
import { PipelineElementEndpointService } from '../../../projects/streampipes/platform-services/src/lib/apis/pipeline-element-endpoint.service';
import { FilesService } from '../../../projects/streampipes/platform-services/src/lib/apis/files.service';
import { MeasurementUnitsService } from '../../../projects/streampipes/platform-services/src/lib/apis/measurement-units.service';
import { PipelineElementTemplateService } from '../../../projects/streampipes/platform-services/src/lib/apis/pipeline-element-template.service';
import { PipelineMonitoringService } from '../../../projects/streampipes/platform-services/src/lib/apis/pipeline-monitoring.service';
import { SemanticTypesService } from '../../../projects/streampipes/platform-services/src/lib/apis/semantic-types.service';
import { PipelineCanvasMetadataService } from '../../../projects/streampipes/platform-services/src/lib/apis/pipeline-canvas-metadata.service';
import { PipelineTemplateService } from '../../../projects/streampipes/platform-services/src/lib/apis/pipeline-template.service';
import { UserService } from '../../../projects/streampipes/platform-services/src/lib/apis/user.service';
import { UserGroupService } from '../../../projects/streampipes/platform-services/src/lib/apis/user-group.service';
import { MailConfigService } from '../../../projects/streampipes/platform-services/src/lib/apis/mail-config.service';
import { PermissionsService } from '../../../projects/streampipes/platform-services/src/lib/apis/permissions.service';
import { GeneralConfigService } from '../../../projects/streampipes/platform-services/src/lib/apis/general-config.service';

@NgModule({
  imports: [],
  declarations: [],
  providers: [
    FilesService,
    GeneralConfigService,
    MailConfigService,
    MeasurementUnitsService,
    PermissionsService,
    PlatformServicesCommons,
    PipelineCanvasMetadataService,
    PipelineElementEndpointService,
    PipelineElementTemplateService,
    PipelineElementService,
    PipelineMonitoringService,
    PipelineService,
    SemanticTypesService,
    PipelineTemplateService,
    UserService,
    UserGroupService
  ],
  entryComponents: []
})
export class PlatformServicesModule {
}
