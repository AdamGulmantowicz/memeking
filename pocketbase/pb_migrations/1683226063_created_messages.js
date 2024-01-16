migrate((db) => {
  const collection = new Collection({
    "id": "nyy0thxqxq1t5if",
    "created": "2023-05-04 18:47:42.942Z",
    "updated": "2023-05-04 18:47:42.942Z",
    "name": "messages",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "1yr3cta8",
        "name": "message",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
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
  const collection = dao.findCollectionByNameOrId("nyy0thxqxq1t5if");

  return dao.deleteCollection(collection);
})
