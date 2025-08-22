// controllers/contactController.js
import { validationResult } from 'express-validator';
import Contact from '../models/contactModel.js';
import Communication from '../models/communicationModel.js';

const ContactController = {
  // Create contact
  async createContact(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const contact = await Contact.create(req.body);
      return res.status(201).json({ success: true, data: contact });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  },

  // Get single contact
  async getContact(req, res) {
    try {
      const contact = await Contact.findByPk(req.params.id);
      if (!contact) {
        return res.status(404).json({ success: false, message: 'Contact not found' });
      }
      return res.json({ success: true, data: contact });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  },

  // Update contact
  async updateContact(req, res) {
    try {
      const contact = await Contact.findByPk(req.params.id);
      if (!contact) {
        return res.status(404).json({ success: false, message: 'Contact not found' });
      }

      await contact.update(req.body);
      return res.json({ success: true, data: contact });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  },

  // Delete contact
  async deleteContact(req, res) {
    try {
      const deleted = await Contact.destroy({ where: { id: req.params.id } });
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Contact not found' });
      }
      return res.json({ success: true, message: 'Deleted' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  },

  // List contacts with search, pagination, sorting
  async listContacts(req, res) {
    try {
      const { q, page = 1, limit = 20, sort = 'created_at', order = 'DESC' } = req.query;
      const offset = (page - 1) * limit;

      const where = {};
      if (q) {
        where.name = { [Op.like]: `%${q}%` };
      }

      const { count, rows } = await Contact.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset,
        order: [[sort, order.toUpperCase()]]
      });

      return res.json({
        success: true,
        data: rows,
        page: Number(page),
        limit: Number(limit),
        total: count
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  },

  // Add communication to contact
  async addCommunication(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const contact = await Contact.findByPk(req.params.contactId);
      if (!contact) {
        return res.status(404).json({ success: false, message: 'Contact not found' });
      }

      const comm = await Communication.create({
        contact_id: contact.id,
        type: req.body.type,
        direction: req.body.direction || 'outbound',
        subject: req.body.subject || null,
        body: req.body.body || null,
        channel_metadata: req.body.channel_metadata || null,
        occurred_at: req.body.occurred_at || new Date()
      });

      return res.status(201).json({ success: true, data: comm });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  },

  // List communications for a contact
  async listCommunications(req, res) {
    try {
      const contact = await Contact.findByPk(req.params.contactId);
      if (!contact) {
        return res.status(404).json({ success: false, message: 'Contact not found' });
      }

      const { page = 1, limit = 50 } = req.query;
      const offset = (page - 1) * limit;

      const { count, rows } = await Communication.findAndCountAll({
        where: { contact_id: contact.id },
        order: [['occurred_at', 'DESC']],
        limit: parseInt(limit),
        offset
      });

      return res.json({
        success: true,
        data: rows,
        page: Number(page),
        limit: Number(limit),
        total: count
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  },

  // Get a single communication
  async getCommunication(req, res) {
    try {
      const comm = await Communication.findByPk(req.params.commId);
      if (!comm) {
        return res.status(404).json({ success: false, message: 'Communication not found' });
      }
      return res.json({ success: true, data: comm });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  },

  // Delete a communication
  async deleteCommunication(req, res) {
    try {
      const deleted = await Communication.destroy({ where: { id: req.params.commId } });
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Communication not found' });
      }
      return res.json({ success: true, message: 'Deleted' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  }
};

export default ContactController;
