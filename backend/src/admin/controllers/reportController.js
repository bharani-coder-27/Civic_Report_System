import { assignWardsToStaff } from '../models/adminModel.js';

export async function assignWards(req, res) {
  try {
    const { staffId, wardIds } = req.body;

    if (!staffId || !wardIds) {
      return res.status(400).json({ message: 'staffId and wardIds are required' });
    }

    // 🔹 Normalize wardIds into an array
    const wardList = Array.isArray(wardIds) ? wardIds : [wardIds];

    if (wardList.length === 0) {
      return res.status(400).json({ message: 'At least one wardId is required' });
    }

    const updatedStaff = await assignWardsToStaff(staffId, wardList);

    if (!updatedStaff) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    res.status(200).json({
      message: 'Wards assigned successfully',
      staff: updatedStaff,
    });
  } catch (error) {
    console.error('Error assigning wards:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
