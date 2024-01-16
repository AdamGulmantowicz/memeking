migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y1lt3hj0eve59u1")

  // remove
  collection.schema.removeField("upk0tagr")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vy15mi5b",
    "name": "upvote_ids",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bdeqlgdh",
    "name": "post",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "6yhormzgeowbl0e",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y1lt3hj0eve59u1")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "upk0tagr",
    "name": "upvote_ids",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("vy15mi5b")

  // remove
  collection.schema.removeField("bdeqlgdh")

  return dao.saveCollection(collection)
})
