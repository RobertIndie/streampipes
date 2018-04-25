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
package org.streampipes.wrapper.kafka.converter;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.kafka.streams.kstream.ValueMapper;
import org.streampipes.logging.impl.EventStatisticLogger;
import org.streampipes.model.base.InvocableStreamPipesEntity;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class JsonToMapFormat implements ValueMapper<String, Iterable<Map<String,
        Object>>> {

  private ObjectMapper mapper;
  private InvocableStreamPipesEntity graph;

  public JsonToMapFormat(InvocableStreamPipesEntity graph) {
    this.mapper = new ObjectMapper();
    this.graph = graph;
  }


  @Override
  public Iterable<Map<String, Object>> apply(String s) {
    try {
      EventStatisticLogger.log(graph.getName(), graph.getCorrespondingPipeline(), graph.getUri());
      return Arrays.asList(mapper.readValue(s, HashMap.class));
    } catch (IOException e) {
      e.printStackTrace();
    }
    return null;
  }
}
