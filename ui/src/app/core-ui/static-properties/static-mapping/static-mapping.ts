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

import {StaticPropertyUtilService} from "../static-property-util.service";
import {PropertySelectorService} from "../../../services/property-selector.service";
import {
  EventProperty,
  EventPropertyList,
  EventPropertyNested,
  EventPropertyPrimitive,
  EventPropertyUnion,
  MappingProperty
} from "../../../../../projects/streampipes/platform-services/src/lib/model/gen/streampipes-model";
import {AbstractValidatedStaticPropertyRenderer} from "../base/abstract-validated-static-property";
import {Directive} from "@angular/core";
import {ConfigurationInfo} from "../../../connect/model/ConfigurationInfo";


@Directive()
export abstract class StaticMappingComponent<T extends MappingProperty>
    extends AbstractValidatedStaticPropertyRenderer<T> {

    protected firstStreamPropertySelector: string = "s0::";
    protected secondStreamPropertySelector: string = "s1::";

    availableProperties: Array<any> = [];

    constructor(){
        super();
    }

    getName(eventProperty) {
        return eventProperty.label
            ? eventProperty.label
            : eventProperty.runTimeName;
    }

    extractPossibleSelections(): void {
        this.eventSchemas.forEach((schema, index) => {
            let streamIdentifier = index == 0 ? this.firstStreamPropertySelector : this.secondStreamPropertySelector;
            let streamProperties = schema
                .eventProperties
                .filter(ep => this.isInSelection(ep, streamIdentifier))
                .map(ep => this.cloneEp(ep));
            streamProperties.forEach(ep => (ep as any).propertySelector = streamIdentifier + ep.runtimeName);
            this.availableProperties = this.availableProperties.concat(streamProperties);
        });
    }

    isInSelection(ep: EventProperty, streamIdentifier: string): boolean {
        return this.staticProperty.mapsFromOptions
            .some(maps => (maps === streamIdentifier + ep.runtimeName));
    }

    cloneEp(ep: EventPropertyUnion) {
        if (ep instanceof EventPropertyPrimitive) {
            return EventPropertyPrimitive.fromData(ep, new EventPropertyPrimitive());
        } else if (ep instanceof EventPropertyList) {
            return EventPropertyList.fromData(ep, new EventPropertyList());
        } else {
            return EventPropertyNested.fromData(ep, new EventPropertyNested());
        }
    }
}
