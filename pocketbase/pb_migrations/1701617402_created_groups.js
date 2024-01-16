migrate((db) => {
  const collection = new Collection({
    "id": "cvcflvfdma9gdlx",
    "created": "2023-12-03 15:30:02.210Z",
    "updated": "2023-12-03 15:30:02.210Z",
    "name": "groups",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "g3gdoioz",
        "name": "contentText",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "nrvrwmjv",
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
      },
      {
        "system": false,
        "id": "xyxko0ro",
        "name": "posts",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "6yhormzgeowbl0e",
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
  const collection = dao.findCollectionByNameOrId("cvcflvfdma9gdlx");

  return dao.deleteCollection(collection);
})
