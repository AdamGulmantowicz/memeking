migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6yhormzgeowbl0e")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lmq32nev",
    "name": "group_id",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "cvcflvfdma9gdlx",
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
  collection.schema.removeField("lmq32nev")

  return dao.saveCollection(collection)
})
