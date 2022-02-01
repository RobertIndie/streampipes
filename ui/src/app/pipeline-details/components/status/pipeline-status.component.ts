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

import {Component, Input, OnInit} from "@angular/core";
import {PipelineService} from "../../../../../projects/streampipes/platform-services/src/lib/apis/pipeline.service";
import {Pipeline, PipelineStatusMessage} from "../../../../../projects/streampipes/platform-services/src/lib/model/gen/streampipes-model";

@Component({
    selector: 'pipeline-status',
    templateUrl: './pipeline-status.component.html',
})
export class PipelineStatusComponent implements OnInit {

    pipelineStatus: PipelineStatusMessage[];

    @Input()
    pipeline: Pipeline;

    constructor(private pipelineService: PipelineService) {
        this.pipelineStatus = [];
    }

    ngOnInit() {
        this.getPipelineStatus();
    }

    getPipelineStatus() {
        this.pipelineService.getPipelineStatusById(this.pipeline._id)
            .subscribe(msg => {
                this.pipelineStatus = msg.sort((a, b) => {
                    return a.timestamp - b.timestamp;
                });
            });
    }

}
