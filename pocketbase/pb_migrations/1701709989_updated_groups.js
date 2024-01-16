migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cvcflvfdma9gdlx")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hx6wucwx",
    "name": "title",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cvcflvfdma9gdlx")

  // remove
  collection.schema.removeField("hx6wucwx")

  return dao.saveCollection(collection)
})
