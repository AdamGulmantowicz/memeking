migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y1lt3hj0eve59u1")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qrta7p5o",
    "name": "post_id",
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

  // remove
  collection.schema.removeField("qrta7p5o")

  return dao.saveCollection(collection)
})
