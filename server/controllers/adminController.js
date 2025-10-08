import Company from '../models/Company.js';

/**
 * Get all pending companies
 * GET /api/admin/companies/pending
 */
export const getPendingCompanies = async (req, res) => {
  try {
    const pendingCompanies = await Company.find({ status: 'Pending' })
      .select('-password')
      .sort({ createdAt: -1 });
    
    res.json({
      count: pendingCompanies.length,
      companies: pendingCompanies
    });
  } catch (error) {
    console.error('Get pending companies error:', error);
    res.status(500).json({
      error: 'Error fetching pending companies',
      details: error.message
    });
  }
};

/**
 * Approve a company
 * PUT /api/admin/companies/approve/:id
 */
export const approveCompany = async (req, res) => {
  try {
    const { id } = req.params;
    
    const company = await Company.findById(id);
    
    if (!company) {
      return res.status(404).json({
        error: 'Company not found'
      });
    }
    
    if (company.status === 'Approved') {
      return res.status(400).json({
        error: 'Company is already approved'
      });
    }
    
    company.status = 'Approved';
    await company.save();
    
    res.json({
      message: 'Company approved successfully',
      company: company.toSafeObject()
    });
  } catch (error) {
    console.error('Approve company error:', error);
    res.status(500).json({
      error: 'Error approving company',
      details: error.message
    });
  }
};

/**
 * Reject a company
 * PUT /api/admin/companies/reject/:id
 */
export const rejectCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    
    const company = await Company.findById(id);
    
    if (!company) {
      return res.status(404).json({
        error: 'Company not found'
      });
    }
    
    company.status = 'Rejected';
    company.rejectionReason = reason || '';
    await company.save();
    
    res.json({
      message: 'Company rejected',
      company: company.toSafeObject()
    });
  } catch (error) {
    console.error('Reject company error:', error);
    res.status(500).json({
      error: 'Error rejecting company',
      details: error.message
    });
  }
};

/**
 * Get all companies with their status
 * GET /api/admin/companies
 */
export const getAllCompanies = async (req, res) => {
  try {
    const { status } = req.query;
    
    const query = status ? { status } : {};
    const companies = await Company.find(query)
      .select('-password')
      .sort({ createdAt: -1 });
    
    res.json({
      count: companies.length,
      companies
    });
  } catch (error) {
    console.error('Get all companies error:', error);
    res.status(500).json({
      error: 'Error fetching companies',
      details: error.message
    });
  }
};

