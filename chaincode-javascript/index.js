/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

const pacientCRUD = require('./lib/pacientCRUD')

module.exports.PacientCRUD = pacientCRUD
module.exports.contracts = [pacientCRUD]
