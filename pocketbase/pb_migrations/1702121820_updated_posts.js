migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6yhormzgeowbl0e")

  // remove
  collection.schema.removeField("wbl3vkuz")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6yhormzgeowbl0e")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wbl3vkuz",
    "name": "title",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 5,
      "max": 50,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
