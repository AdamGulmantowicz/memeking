migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cvcflvfdma9gdlx")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yopsvqjz",
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
  const collection = dao.findCollectionByNameOrId("cvcflvfdma9gdlx")

  // remove
  collection.schema.removeField("yopsvqjz")

  return dao.saveCollection(collection)
})
