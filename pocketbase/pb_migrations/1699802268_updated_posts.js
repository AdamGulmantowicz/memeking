migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6yhormzgeowbl0e")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xwin4dkz",
    "name": "avatar",
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
  const collection = dao.findCollectionByNameOrId("6yhormzgeowbl0e")

  // remove
  collection.schema.removeField("xwin4dkz")

  return dao.saveCollection(collection)
})
