/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/liberty_nodes.json`.
 */
export type LibertyNodes = {
  "address": "7FA4UQwicuHRh61tCigCeqVio4P667W4dymkrruRukWz",
  "metadata": {
    "name": "libertyNodes",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "createComment",
      "discriminator": [
        236,
        232,
        11,
        180,
        70,
        206,
        73,
        145
      ],
      "accounts": [
        {
          "name": "comment",
          "writable": true,
          "signer": true
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "url",
          "type": "string"
        },
        {
          "name": "content",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "commentAccount",
      "discriminator": [
        42,
        146,
        173,
        246,
        2,
        22,
        223,
        91
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "unauthorized",
      "msg": "Unauthorized user"
    }
  ],
  "types": [
    {
      "name": "commentAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "vote",
            "type": "i8"
          },
          {
            "name": "url",
            "type": {
              "array": [
                "u8",
                128
              ]
            }
          },
          {
            "name": "content",
            "type": {
              "array": [
                "u8",
                512
              ]
            }
          }
        ]
      }
    }
  ],
  "constants": [
    {
      "name": "commentSeed",
      "type": "bytes",
      "value": "[99, 111, 109, 109, 101, 110, 116]"
    }
  ]
};
