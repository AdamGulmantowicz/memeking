migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6yhormzgeowbl0e")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ztiglkmu",
    "name": "contentText",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 250,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6yhormzgeowbl0e")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ztiglkmu",
    "name": "text",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 250,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
