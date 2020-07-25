# frozen_string_literal: true

require 'json'

def handler(event:, context:)
  body_json = JSON.generate({ message: 'nothing' })
  body_json = JSON.generate(event['body']) unless event['body'].nil?

  {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: body_json
  }
end
