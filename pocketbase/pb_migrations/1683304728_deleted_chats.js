migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("dgk28dqb2zm6odb");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "dgk28dqb2zm6odb",
    "created": "2023-05-04 18:48:04.262Z",
    "updated": "2023-05-04 18:48:04.262Z",
    "name": "chats",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "lqq36qrv",
        "name": "user",
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
      },
      {
        "system": false,
        "id": "7smitkxk",
        "name": "message",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "nyy0thxqxq1t5if",
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
})
