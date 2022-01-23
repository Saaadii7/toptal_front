class CreateEatables < ActiveRecord::Migration[7.0]
  def change
    create_table :eatables, id: :uuid do |t|
      t.datetime :eating_time
      t.string :name
      t.integer :calorie
      t.references :user, index: true, foreign_key: true, type: :uuid
      t.timestamps
    end
  end
end
