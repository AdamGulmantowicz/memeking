migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6yhormzgeowbl0e")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hjdtfsrw",
    "name": "author_id",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6yhormzgeowbl0e")

  // remove
  collection.schema.removeField("hjdtfsrw")

  return dao.saveCollection(collection)
})
