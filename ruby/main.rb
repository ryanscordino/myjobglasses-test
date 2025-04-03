require 'json'
require 'csv'
require './validator'
require './utils'

if __FILE__ == $PROGRAM_NAME
  return unless Validator.json_file_valid?(ARGV[0])

  input = File.read(ARGV[0])
  output = ARGV[1] || 'output.csv'
  response = Utils.convert_json_to_csv(input)
  File.write(output, response)
  puts 'Succes!'
end
