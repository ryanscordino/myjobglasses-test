# Helper to valide files
module Validator
  module_function

  def file_valid?(file)
    if file and File.exist?(file)
      json?(File.read(file))
    else
      puts 'The input file does not exist'
      false
    end
  end

  def json?(json_file)
    JSON.parse(json_file)
    true
  rescue JSON::ParserError
    puts 'Invalid JSON file'
    false
  end
end
