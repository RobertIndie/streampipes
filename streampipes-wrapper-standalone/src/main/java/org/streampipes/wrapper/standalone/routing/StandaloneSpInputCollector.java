/*
 * Copyright 2018 FZI Forschungszentrum Informatik
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

package org.streampipes.wrapper.standalone.routing;

import org.streampipes.commons.exceptions.SpRuntimeException;
import org.streampipes.logging.impl.EventStatisticLogger;
import org.streampipes.messaging.InternalEventProcessor;
import org.streampipes.model.base.InvocableStreamPipesEntity;
import org.streampipes.model.grounding.TransportFormat;
import org.streampipes.model.grounding.TransportProtocol;
import org.streampipes.wrapper.routing.SpInputCollector;
import org.streampipes.wrapper.runtime.PipelineElement;
import org.streampipes.wrapper.standalone.manager.ProtocolManager;

public class StandaloneSpInputCollector<T extends TransportProtocol> extends
        StandaloneSpCollector<T, PipelineElement<?>>
        implements
        InternalEventProcessor<byte[]>, SpInputCollector {

  private Boolean singletonEngine;


  public StandaloneSpInputCollector(T protocol, TransportFormat format,
                                    Boolean singletonEngine) throws SpRuntimeException {
    super(protocol, format);
    this.singletonEngine = singletonEngine;
  }

  @Override
  public void onEvent(byte[] event) {
    if (singletonEngine) {
     send(consumers.get(consumers.keySet().toArray()[0]), event);
    } else {
      consumers.keySet().forEach(c -> {
        send(consumers.get(c), event);
      });
    }
  }

  private void send(PipelineElement<?> processor, byte[] event) {
    try {
      processor.onEvent(dataFormatDefinition.toMap(event), getTopic());
      InvocableStreamPipesEntity graph = processor.getGraph();
      EventStatisticLogger.log(graph.getName(), graph.getCorrespondingPipeline(), graph.getUri());
    } catch (SpRuntimeException e) {
      e.printStackTrace();
    }
  }

  @Override
  public void connect() throws SpRuntimeException {
    if (!protocolDefinition.getConsumer().isConnected()) {
      protocolDefinition.getConsumer().connect
              (transportProtocol,
                      this);
    }
  }

  @Override
  public void disconnect() throws SpRuntimeException {
    if (protocolDefinition.getConsumer().isConnected()) {
      if (consumers.size() == 0) {
        protocolDefinition.getConsumer().disconnect();
        ProtocolManager.removeInputCollector(transportProtocol);
      }
    }
  }
}
