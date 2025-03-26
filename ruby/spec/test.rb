require 'rspec'
require './validator'
require './utils'
require 'csv'
require 'json'

RSpec.describe Validator do
  context '#json_file_valid?' do
    it 'returns true with a valid file' do
      expect(Validator.json_file_valid?('./spec/input_test.json')).to equal(true)
    end
    it 'returns false with a non existant file' do
      expect(Validator.json_file_valid?('./spec/non_existant_file.json')).to equal(false)
    end
    it 'returns false when the file is not a json' do
      expect(Validator.json_file_valid?('./spec/output_test.csv')).to equal(false)
    end
  end
end

RSpec.describe Utils do
  context '#convert_json_to_csv' do
    valid_json = File.read('./spec/input_test.json')
    it 'return a valid csv with a valid json' do
      expect(Utils.convert_json_to_csv(valid_json)).to eq(File.read('./spec/output_test.csv'))
    end
  end
end
