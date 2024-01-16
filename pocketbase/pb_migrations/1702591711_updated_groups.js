migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cvcflvfdma9gdlx")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yuz1mcen",
    "name": "avatar",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 6291456,
      "mimeTypes": [
        "image/jpeg",
        "image/png"
      ],
      "thumbs": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cvcflvfdma9gdlx")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yuz1mcen",
    "name": "avatar",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [
        "image/jpeg",
        "image/png"
      ],
      "thumbs": []
    }
  }))

  return dao.saveCollection(collection)
})
