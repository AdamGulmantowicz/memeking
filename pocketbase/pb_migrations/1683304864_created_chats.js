migrate((db) => {
  const collection = new Collection({
    "id": "8sgoy2rmztbaer0",
    "created": "2023-05-05 16:41:04.542Z",
    "updated": "2023-05-05 16:41:04.542Z",
    "name": "chats",
    "type": "base",
    "system": false,
    "schema": [
      {
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
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("8sgoy2rmztbaer0");

  return dao.deleteCollection(collection);
})
