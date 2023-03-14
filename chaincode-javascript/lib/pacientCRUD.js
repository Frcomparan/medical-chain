/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

// Deterministic JSON.stringify()
const stringify = require('json-stringify-deterministic')
const sortKeysRecursive = require('sort-keys-recursive')
const { Contract } = require('fabric-contract-api')

class PacientCRUD extends Contract {
  async InitLedger(ctx) {
    const assets = [
      {
        Id: '1',
        Name: 'Gustavo',
        LastName: 'Garcia',
        Weight: '80',
        Heigh: '187',
        BloodType: 'O+',
      },
      {
        Id: '2',
        Name: 'Ernesto',
        LastName: 'Gómez',
        Weight: '88',
        Heigh: '177',
        BloodType: 'A+',
      },
      {
        Id: '3',
        Name: 'Maria',
        LastName: 'Cortez',
        Weight: '60',
        Heigh: '160',
        BloodType: 'AB+',
      },
      {
        Id: '4',
        Name: 'Antonia',
        LastName: 'Federica',
        Weight: '80',
        Heigh: '170',
        BloodType: 'O+',
      },
      {
        Id: '5',
        Name: 'Jose',
        LastName: 'Heredia',
        Weight: '100',
        Heigh: '180',
        BloodType: 'O-',
      },
    ]

    for (const asset of assets) {
      asset.docType = 'pacient'
      // example of how to write to world state deterministically
      // use convetion of alphabetic order
      // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
      // when retrieving data, in any lang, the order of data will be the same and consequently also the corresonding hash
      await ctx.stub.putState(
        asset.Id,
        Buffer.from(stringify(sortKeysRecursive(asset)))
      )
    }
  }

  // CreatePacient issues a new pacient to the world state with given details.
  async CreatePacient(ctx, id, name, lastname, weigth, heigh, bloodType) {
    const exists = await this.PacientExists(ctx, id)
    if (exists) {
      return `The pacient ${id} already exists`
    }

    const pacient = {
      Id: id,
      Name: name | null,
      LastName: lastname | null,
      Weight: weigth | null,
      Heigh: heigh | null,
      BloodType: bloodType | null,
    }
    // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
    await ctx.stub.putState(
      id,
      Buffer.from(stringify(sortKeysRecursive(pacient)))
    )
    return JSON.stringify(pacient)
  }

  // ReadPacient returns the asset stored in the world state with given id.
  async ReadPacient(ctx, id) {
    const pacientJSON = await ctx.stub.getState(id) // get the pacient from chaincode state
    if (!pacientJSON || pacientJSON.length === 0) {
      throw new Error(`The pacient ${id} does not exist`)
    }
    return pacientJSON.toString()
  }

  // UpdatePacient updates an existing Pacient in the world state with provided parameters.
  async UpdatePacient(ctx, id, name, lastname, weigth, heigh, bloodType) {
    const exists = await this.PacientExists(ctx, id)
    if (!exists) {
      console.error('Before error')
      throw new Error(`The pacient ${id} does not exist`)
    }

    console.log({ name, lastname, weigth, heigh, bloodType })

    // overwriting original pacient with new pacient data
    const updatedPacient = {
      Id: id,
      Name: name,
      LastName: lastname,
      Weight: weigth,
      Heigh: heigh,
      BloodType: bloodType,
    }
    // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
    return ctx.stub.putState(
      id,
      Buffer.from(stringify(sortKeysRecursive(updatedPacient)))
    )
  }

  // DeletePacient deletes an given pacient from the world state.
  async DeletePacient(ctx, id) {
    const exists = await this.PacientExists(ctx, id)
    if (!exists) {
      throw new Error(`The pacient ${id} does not exist`)
    }
    return ctx.stub.deleteState(id)
  }

  // PacientExists returns true when asset with given ID exists in world state.
  async PacientExists(ctx, id) {
    const pacientJSON = await ctx.stub.getState(id)
    return pacientJSON && pacientJSON.length > 0
  }

  // // TransferAsset updates the owner field of asset with given id in the world state.
  // async TransferAsset(ctx, id, newOwner) {
  //   const assetString = await this.ReadAsset(ctx, id)
  //   const asset = JSON.parse(assetString)
  //   const oldOwner = asset.Owner
  //   asset.Owner = newOwner
  //   // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
  //   await ctx.stub.putState(
  //     id,
  //     Buffer.from(stringify(sortKeysRecursive(asset)))
  //   )
  //   return oldOwner
  // }

  // GetAllPacients returns all pacients found in the world state.
  async GetAllPacients(ctx) {
    const allResults = []
    // range query with empty string for startKey and endKey does an open-ended query of all pacients in the chaincode namespace.
    const iterator = await ctx.stub.getStateByRange('', '')
    let result = await iterator.next()
    while (!result.done) {
      const strValue = Buffer.from(result.value.value.toString()).toString(
        'utf8'
      )
      let record
      try {
        record = JSON.parse(strValue)
      } catch (err) {
        console.log(err)
        record = strValue
      }
      allResults.push(record)
      result = await iterator.next()
    }
    return JSON.stringify(allResults)
  }
}

module.exports = PacientCRUD
