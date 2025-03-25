require './const'

# Module to manipulate data
module Utils
  module_function

  def convert_json_to_csv(json_file)
    CSV.generate do |csv|
      csv << Const.header_data
      JSON.parse(json_file).each do |data_user|
        row = Const.header_data.map do |column_name|
          handle_value(data_user, column_name.split('.'))
        end
        csv << row
      end
    end
  end

  def handle_value(data_user, column_name)
    value = column_name.inject(data_user) do |acc, key|
      acc.is_a?(Hash) ? acc[key] : acc
    end
    value.is_a?(Array) ? value.join(',') : value
  end
end
