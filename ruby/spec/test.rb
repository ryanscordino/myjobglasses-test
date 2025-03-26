require 'rspec'
require './validator'

RSpec.describe Validator do
  context '#file_valid?' do
    it 'returns true with a valid file' do
      expect(Validator.file_valid?('./spec/input_test.json')).to equal(true)
    end
  end
end
