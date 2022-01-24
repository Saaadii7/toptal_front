# frozen_string_literal: true

class ReportRequest < CommonRequest
  attr_accessor :start, :end

  validates :start, presence: true, on: [:calorie_intake]
  validate :verify_end_datetime, on: [:calorie_intake]
  validate :verify_start_datetime, on: [:calorie_intake]

  def verify_end_datetime
    self.end = DateTime.now if self.end.nil?
    self.end = self.end.to_datetime

    return errors.add(:end, 'Report Period end time should be less than Present.') if self.end > DateTime.now
  end

  def verify_start_datetime
    self.start = start.to_datetime

    return errors.add(:end, 'Report start time should be less than end time.') if start > self.end
  end
end
