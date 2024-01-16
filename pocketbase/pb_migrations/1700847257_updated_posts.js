migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6yhormzgeowbl0e")

  // remove
  collection.schema.removeField("igsoxhsg")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6yhormzgeowbl0e")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "igsoxhsg",
    "name": "comments",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "y1lt3hj0eve59u1",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
