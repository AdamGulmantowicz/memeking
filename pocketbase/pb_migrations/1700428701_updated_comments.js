migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y1lt3hj0eve59u1")

  // remove
  collection.schema.removeField("bdeqlgdh")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y1lt3hj0eve59u1")

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
})
