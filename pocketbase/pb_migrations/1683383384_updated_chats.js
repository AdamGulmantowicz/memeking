migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8sgoy2rmztbaer0")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dmec1rdf",
    "name": "users",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8sgoy2rmztbaer0")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dmec1rdf",
    "name": "user_id",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
