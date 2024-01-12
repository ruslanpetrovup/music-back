import { Injectable } from '@nestjs/common';
import { UpdateInvoiceDetailsDto } from './dto/update-invoice-details';
import { InjectModel } from '@nestjs/mongoose';
import { InvoiceDetails } from './schemas/invoice-details.schema';
import mongoose from 'mongoose';
import { Influencer } from 'src/auth/schemas/influencer.schema';
import { CreateInvoiceDtoDto } from './dto/create-invoice.dto';
import { Invoices } from './schemas/invoices.schema';
import { SaveInvoiceData } from './schemas/invoice-save.schema';
import sendMail from 'src/utils/sendMail';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel(InvoiceDetails.name)
    private invoiceDetailsModel: mongoose.Model<InvoiceDetails>,
    @InjectModel(Influencer.name)
    private influencerModel: mongoose.Model<Influencer>,
    @InjectModel(Invoices.name)
    private invoicesModel: mongoose.Model<Invoices>,
    @InjectModel(SaveInvoiceData.name)
    private saveInvoiceDataModel: mongoose.Model<SaveInvoiceData>,
  ) {}

  async updateInvoiceDetails(data: UpdateInvoiceDetailsDto) {
    try {
      if (!data) {
        return {
          status: 400,
          message: 'Not enough arguments',
        };
      }

      const checkUser = await this.invoiceDetailsModel.findOne({ id: data.id });

      if (!checkUser) {
        await this.invoiceDetailsModel.create(data);
      } else {
        await this.invoiceDetailsModel.findOneAndUpdate({ id: data.id }, data);
      }

      return {
        code: 200,
        message: 'invoice details update',
      };
    } catch (err) {
      console.log(err);
      return {
        code: 500,
        message: err,
      };
    }
  }

  async getInvoiceDetails(id: string) {
    try {
      if (!id) {
        return {
          status: 400,
          message: 'Not enough arguments',
        };
      }

      const checkUser = await this.invoiceDetailsModel.findOne({ id: id });

      if (!checkUser) {
        return {
          code: 404,
          message: 'invoice details not found',
        };
      }

      return {
        code: 200,
        invoiceDetails: checkUser,
      };
    } catch (err) {
      console.log(err);
      return {
        code: 500,
        message: err,
      };
    }
  }

  async createInvoice(data: CreateInvoiceDtoDto) {
    try {
      const checkUser = await this.influencerModel.findOne({
        _id: data.influencerId,
      });

      if (!checkUser) {
        return {
          code: 404,
          message: 'influencer not found',
        };
      }

      const result = await this.invoicesModel.create({
        ...data,
        status: 'in progress',
      });
      const findSaveData = await this.saveInvoiceDataModel.findOne({
        influencerId: data.influencerId,
      });
      if (findSaveData) {
        await this.saveInvoiceDataModel.findByIdAndUpdate(
          { _id: findSaveData._id },
          data,
        );
      } else {
        await this.saveInvoiceDataModel.create(data);
      }

      await sendMail(
        'admin@soundinfluencers.com',
        'soundinfluencers',
        `<p>Invoice from ${checkUser.firstName}</p>`,
        'html',
      );
      return {
        code: 201,
        result,
      };
    } catch (err) {
      console.log(err);
    }
  }

  async getInvoices(influencerId: string) {
    if (!influencerId) {
      return {
        status: 400,
        message: 'Not enough arguments',
      };
    }

    try {
      const result = await this.invoicesModel.find({
        influencerId: influencerId,
      });
      return {
        code: 200,
        invoices: result,
      };
    } catch (err) {
      console.log();
    }
  }

  async getInvoiceSave(influencerId: string) {
    if (!influencerId) {
      return {
        status: 400,
        message: 'Not enough arguments',
      };
    }

    try {
      const result = await this.saveInvoiceDataModel.findOne({
        influencerId: influencerId,
      });
      if (result) {
        return {
          code: 200,
          invoice: result,
        };
      } else {
        return {
          code: 404,
          message: 'not found',
        };
      }
    } catch (err) {
      console.log();
    }
  }
}
