# frozen_string_literal: true

require 'json'
require 'aws-sdk'

def handler(event:, context:)
  puts 'received event'
  puts JSON.generate(event)

  return response 200, { message: 'nothing' } if event.dig('body').nil?

  begin
    body_hash = JSON.parse event['body']
    puts 'Slack event body'
    puts JSON.generate body_hash
  rescue RuntimeError => e
    puts e
    return response 501, { message: 'could not parse the event body' }
  end

  return response 200, **{ challenge: body_hash['challenge'] } if body_hash['type'] == 'url_verification'

  queue = Aws::SQS::Client.new(region: 'ap-northeast-1')
  result = queue.send_message(
    queue_url: ENV['SQS_URL'], message_body: JSON.generate(body_hash)
  )
  puts 'send message result'
  puts JSON.generate(result)
  response 200, { message: 'ok' }
end

def response(status_code, body)
  {
    statusCode: status_code,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.generate(body)
  }
end
