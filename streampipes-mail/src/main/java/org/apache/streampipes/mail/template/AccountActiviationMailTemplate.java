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
package org.apache.streampipes.mail.template;

import j2html.tags.ContainerTag;
import org.apache.streampipes.mail.template.part.LinkPart;

import static j2html.TagCreator.*;

public class AccountActiviationMailTemplate extends AbstractMailTemplate {

  private final String activationCode;

  public AccountActiviationMailTemplate(String activationCode) {
    this.activationCode = activationCode;
  }

  @Override
  protected String getTitle() {
    return "Account Activation";
  }

  @Override
  protected ContainerTag getContent() {
    return div(makeBodyText()).withClass("mail-body-text");
  }

  private ContainerTag makeBodyText() {
    return div(span("Activate your account "), new LinkPart("/activate?" +this.activationCode, "here").toTag());
  }
}