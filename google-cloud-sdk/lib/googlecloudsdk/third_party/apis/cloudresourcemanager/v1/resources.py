# Copyright 2015 Google Inc. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
"""Resource definitions for cloud platform apis."""

import enum


BASE_URL = 'https://cloudresourcemanager.googleapis.com/v1/'
DOCS_URL = 'https://cloud.google.com/resource-manager'


class Collections(enum.Enum):
  """Collections for all supported apis."""

  LIENS = (
      'liens',
      'liens/{liensId}',
      {},
      ['liensId']
  )
  OPERATIONS = (
      'operations',
      'operations/{operationsId}',
      {},
      [u'operationsId']
  )
  ORGANIZATIONS = (
      'organizations',
      'organizations/{organizationsId}',
      {},
      [u'organizationsId']
  )
  PROJECTS = (
      'projects',
      'projects/{projectId}',
      {},
      [u'projectId']
  )

  def __init__(self, collection_name, path, flat_paths, params):
    self.collection_name = collection_name
    self.path = path
    self.flat_paths = flat_paths
    self.params = params
