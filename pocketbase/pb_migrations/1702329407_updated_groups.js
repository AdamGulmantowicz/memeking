migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cvcflvfdma9gdlx")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9ubuk1of",
    "name": "aboutText",
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
  collection.schema.removeField("9ubuk1of")

  return dao.saveCollection(collection)
})
